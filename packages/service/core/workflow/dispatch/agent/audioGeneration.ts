import { NodeInputKeyEnum, NodeOutputKeyEnum } from '@fastgpt/global/core/workflow/constants';
import { DispatchNodeResponseKeyEnum } from '@fastgpt/global/core/workflow/runtime/constants';
import type { ModuleDispatchProps } from '@fastgpt/global/core/workflow/runtime/type';
import { DispatchNodeResultType } from '@fastgpt/global/core/workflow/runtime/type';

type Props = ModuleDispatchProps<{
  [NodeInputKeyEnum.storyCreation]: {
    role: string;
    text: string;
  }[];
}>;

type Response = DispatchNodeResultType<{
  [NodeOutputKeyEnum.success]: boolean;
  [NodeOutputKeyEnum.audioResult]: {
    audioUrl: string;
    role: string;
    text: string;
  }[];
}>;

export async function dispatchAudioGeneration(props: Props): Promise<Response> {
  const {
    params: { storyCreation }
  } = props;

  if (!storyCreation || storyCreation.length === 0) {
    return Promise.reject('Story dialogs are empty');
  }

  try {
    return {
      [NodeOutputKeyEnum.success]: true,
      [NodeOutputKeyEnum.audioResult]: storyCreation.map((dialog, index) => ({
        audioUrl: 'http://localhost:8111/tts?txt=' + dialog.text + '&c=' + dialog.role,
        role: dialog.role,
        text: dialog.text
      })),
      [DispatchNodeResponseKeyEnum.nodeResponse]: {
        audioResult: storyCreation.map((dialog, index) => ({
          audioUrl: 'http://localhost:8111/tts?txt=' + dialog.text + '&c=' + dialog.role,
          role: dialog.role,
          text: dialog.text
        }))
      }
    };
  } catch (error) {
    console.error('Audio generation API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error('Failed to generate audio: ' + errorMessage);
  }
}
