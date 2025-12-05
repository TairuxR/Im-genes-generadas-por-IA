export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';

export type GenerationState = 'idle' | 'loading' | 'success' | 'error';

export interface PromptEditorProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  aspectRatio: AspectRatio;
  setAspectRatio: (value: AspectRatio) => void;
}

export interface ImageResultProps {
  imageData: string | null;
  state: GenerationState;
  aspectRatio: AspectRatio;
}