export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: number;
  }
  
  export interface Model {
    id: string;
    name: string;
    description: string;
    icon: string;
    premium: boolean;
  }
  
  export interface Chat {
    id: string;
    title: string;
    messages: Message[];
    model: string;
    timestamp: number;
  }