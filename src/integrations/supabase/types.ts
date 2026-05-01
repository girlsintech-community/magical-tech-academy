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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      mentor_applications: {
        Row: {
          created_at: string
          email: string
          expertise: string[]
          full_name: string
          id: string
          linkedin_url: string | null
          profession: string
          status: string
          why_mentor: string
        }
        Insert: {
          created_at?: string
          email: string
          expertise?: string[]
          full_name: string
          id?: string
          linkedin_url?: string | null
          profession: string
          status?: string
          why_mentor: string
        }
        Update: {
          created_at?: string
          email?: string
          expertise?: string[]
          full_name?: string
          id?: string
          linkedin_url?: string | null
          profession?: string
          status?: string
          why_mentor?: string
        }
        Relationships: []
      }
      student_applications: {
        Row: {
          age: number
          city: string
          created_at: string
          email: string
          full_name: string
          gender: Database["public"]["Enums"]["gender_option"]
          grade: string
          house: Database["public"]["Enums"]["house_name"] | null
          id: string
          magic_token: string
          parent_email: string
          school: string
          status: Database["public"]["Enums"]["application_status"]
          task_link: string | null
          task_response: string | null
          task_submitted_at: string | null
          updated_at: string
          why_interested: string
        }
        Insert: {
          age: number
          city: string
          created_at?: string
          email: string
          full_name: string
          gender: Database["public"]["Enums"]["gender_option"]
          grade: string
          house?: Database["public"]["Enums"]["house_name"] | null
          id?: string
          magic_token?: string
          parent_email: string
          school: string
          status?: Database["public"]["Enums"]["application_status"]
          task_link?: string | null
          task_response?: string | null
          task_submitted_at?: string | null
          updated_at?: string
          why_interested: string
        }
        Update: {
          age?: number
          city?: string
          created_at?: string
          email?: string
          full_name?: string
          gender?: Database["public"]["Enums"]["gender_option"]
          grade?: string
          house?: Database["public"]["Enums"]["house_name"] | null
          id?: string
          magic_token?: string
          parent_email?: string
          school?: string
          status?: Database["public"]["Enums"]["application_status"]
          task_link?: string | null
          task_response?: string | null
          task_submitted_at?: string | null
          updated_at?: string
          why_interested?: string
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
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      apply_as_mentor: {
        Args: {
          _email: string
          _expertise: string[]
          _full_name: string
          _linkedin: string
          _profession: string
          _why: string
        }
        Returns: boolean
      }
      apply_to_program: {
        Args: {
          _age: number
          _city: string
          _email: string
          _full_name: string
          _gender: Database["public"]["Enums"]["gender_option"]
          _grade: string
          _parent_email: string
          _school: string
          _why: string
        }
        Returns: {
          magic_token: string
          message: string
          status: Database["public"]["Enums"]["application_status"]
          success: boolean
        }[]
      }
      get_application_by_token: {
        Args: { _token: string }
        Returns: {
          full_name: string
          house: Database["public"]["Enums"]["house_name"]
          id: string
          magic_token: string
          status: Database["public"]["Enums"]["application_status"]
          task_link: string
          task_response: string
        }[]
      }
      get_seat_counts: {
        Args: never
        Returns: {
          boys_accepted: number
          boys_applied: number
          boys_cap: number
          girls_accepted: number
          girls_applied: number
          girls_cap: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      submit_task: {
        Args: { _link: string; _response: string; _token: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      application_status:
        | "applied"
        | "task_invited"
        | "task_submitted"
        | "accepted"
        | "rejected"
        | "waitlisted"
      gender_option: "girl" | "boy" | "prefer_not_to_say"
      house_name: "fireforge" | "brightmind" | "codecraft" | "sparkroot"
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
      app_role: ["admin", "user"],
      application_status: [
        "applied",
        "task_invited",
        "task_submitted",
        "accepted",
        "rejected",
        "waitlisted",
      ],
      gender_option: ["girl", "boy", "prefer_not_to_say"],
      house_name: ["fireforge", "brightmind", "codecraft", "sparkroot"],
    },
  },
} as const
