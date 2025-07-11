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

  createTask: publicProcedure
    .input(createTaskSchema)
    .mutation(async ({ input }) => {
      const { data: task, error } = await supabase
        .from("tasks")
        .insert({
          title: input.title,
          description: input.description || "",
          completed: false,
          priority: input.priority,
          due_date: input.dueDate || null,
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create task: ${error.message}`);
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

  updateTask: publicProcedure
    .input(updateTaskSchema)
    .mutation(async ({ input }) => {
      const updateData: any = {};

      if (input.title !== undefined) updateData.title = input.title;
      if (input.description !== undefined)
        updateData.description = input.description;
      if (input.completed !== undefined) updateData.completed = input.completed;
      if (input.priority !== undefined) updateData.priority = input.priority;
      if (input.dueDate !== undefined) updateData.due_date = input.dueDate;

      const { data: task, error } = await supabase
        .from("tasks")
        .update(updateData)
        .eq("id", input.id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update task: ${error.message}`);
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

  deleteTask: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", input.id);

      if (error) {
        throw new Error(`Failed to delete task: ${error.message}`);
      }

      return { success: true };
    }),

  toggleTask: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { data: currentTask, error: fetchError } = await supabase
        .from("tasks")
        .select("completed")
        .eq("id", input.id)
        .single();

      if (fetchError) {
        throw new Error(`Task not found: ${fetchError.message}`);
      }

      const { data: task, error } = await supabase
        .from("tasks")
        .update({ completed: !currentTask.completed })
        .eq("id", input.id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to toggle task: ${error.message}`);
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
