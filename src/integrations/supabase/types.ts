export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activity_sheet_progress: {
        Row: {
          activity_sheet_id: string
          completed_at: string | null
          created_at: string
          form_data: Json
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          activity_sheet_id: string
          completed_at?: string | null
          created_at?: string
          form_data?: Json
          id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          activity_sheet_id?: string
          completed_at?: string | null
          created_at?: string
          form_data?: Json
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      beta_feedback: {
        Row: {
          beta_user_email: string
          beta_user_name: string | null
          created_at: string
          description: string
          feedback_type: string
          id: string
          page_url: string | null
          rating: number | null
          title: string
        }
        Insert: {
          beta_user_email: string
          beta_user_name?: string | null
          created_at?: string
          description: string
          feedback_type: string
          id?: string
          page_url?: string | null
          rating?: number | null
          title: string
        }
        Update: {
          beta_user_email?: string
          beta_user_name?: string | null
          created_at?: string
          description?: string
          feedback_type?: string
          id?: string
          page_url?: string | null
          rating?: number | null
          title?: string
        }
        Relationships: []
      }
      beta_signups: {
        Row: {
          accepted_beta_terms: boolean
          accepted_feedback_commitment: boolean
          accepted_privacy_policy: boolean
          admin_notes: string | null
          approved_at: string | null
          approved_by: string | null
          converted_user_id: string | null
          created_at: string
          current_approach: string | null
          email: string
          goals_expectations: string | null
          has_diagnosis_confirmation: boolean
          id: string
          name: string
          status: string
          updated_at: string
        }
        Insert: {
          accepted_beta_terms?: boolean
          accepted_feedback_commitment?: boolean
          accepted_privacy_policy?: boolean
          admin_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          converted_user_id?: string | null
          created_at?: string
          current_approach?: string | null
          email: string
          goals_expectations?: string | null
          has_diagnosis_confirmation?: boolean
          id?: string
          name: string
          status?: string
          updated_at?: string
        }
        Update: {
          accepted_beta_terms?: boolean
          accepted_feedback_commitment?: boolean
          accepted_privacy_policy?: boolean
          admin_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          converted_user_id?: string | null
          created_at?: string
          current_approach?: string | null
          email?: string
          goals_expectations?: string | null
          has_diagnosis_confirmation?: boolean
          id?: string
          name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      exercise_completions: {
        Row: {
          completed_at: string
          created_at: string
          day: number
          exercise_id: string
          id: string
          notes: string | null
          phase: number
          user_id: string
          week: number
        }
        Insert: {
          completed_at?: string
          created_at?: string
          day: number
          exercise_id: string
          id?: string
          notes?: string | null
          phase?: number
          user_id: string
          week: number
        }
        Update: {
          completed_at?: string
          created_at?: string
          day?: number
          exercise_id?: string
          id?: string
          notes?: string | null
          phase?: number
          user_id?: string
          week?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      task_completions: {
        Row: {
          completed: boolean
          completed_at: string
          created_at: string
          day: number
          id: string
          phase: number
          task_id: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string
          created_at?: string
          day: number
          id?: string
          phase: number
          task_id: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string
          created_at?: string
          day?: number
          id?: string
          phase?: number
          task_id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          created_at: string
          current_phase: number
          data_migrated_to_db: boolean
          has_completed_onboarding: boolean
          id: string
          phase_one_day: number
          phase_three_day: number
          phase_two_day: number
          phase_two_week: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_phase?: number
          data_migrated_to_db?: boolean
          has_completed_onboarding?: boolean
          id?: string
          phase_one_day?: number
          phase_three_day?: number
          phase_two_day?: number
          phase_two_week?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_phase?: number
          data_migrated_to_db?: boolean
          has_completed_onboarding?: boolean
          id?: string
          phase_one_day?: number
          phase_three_day?: number
          phase_two_day?: number
          phase_two_week?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_responses: {
        Row: {
          answers: Json
          completed_at: string
          created_at: string
          group_scores: Json | null
          id: string
          phase: number
          questionnaire_id: string
          recommended_exercises: string[] | null
          saved_activities: Json | null
          score: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          answers: Json
          completed_at?: string
          created_at?: string
          group_scores?: Json | null
          id?: string
          phase: number
          questionnaire_id: string
          recommended_exercises?: string[] | null
          saved_activities?: Json | null
          score?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          answers?: Json
          completed_at?: string
          created_at?: string
          group_scores?: Json | null
          id?: string
          phase?: number
          questionnaire_id?: string
          recommended_exercises?: string[] | null
          saved_activities?: Json | null
          score?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_subscriptions: {
        Row: {
          amount_paid: number
          created_at: string
          id: string
          plan_type: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_paid: number
          created_at?: string
          id?: string
          plan_type: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_paid?: number
          created_at?: string
          id?: string
          plan_type?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "beta_tester"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user", "beta_tester"],
    },
  },
} as const
