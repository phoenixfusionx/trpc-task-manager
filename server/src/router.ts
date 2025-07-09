import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { Context } from "./context.js";
import { supabase, Task } from "./lib/supabase.js";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().default(""),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  dueDate: z.string().nullable().optional(),
});

const updateTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.string().nullable().optional(),
});

export const appRouter = router({
  getTasks: publicProcedure.query(async () => {
    const { data: tasks, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch tasks: ${error.message}`);
    }

    return (
      tasks?.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        priority: task.priority,
        dueDate: task.due_date,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
      })) || []
    );
  }),

  getTask: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { data: task, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", input.id)
        .single();

      if (error) {
        throw new Error(`Task not found: ${error.message}`);
      }

      return {
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        priority: task.priority,
        dueDate: task.due_date,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
      };
    }),
});

export type AppRouter = typeof appRouter;
