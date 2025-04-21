export interface Step {
    step: "plan" | "action" | "observe" | "output" | string;
    content: string;
    function?: string;
    input?: any;
  }
  
  export interface Message {
    role: "user" | "assistant"|"system"|string;
    content: string;
  }
  