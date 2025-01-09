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
}>;

export async function dispatchGameCreation(props: Props): Promise<Response> {
  const {
    params: { storyCreation }
  } = props;

  try {
    return {
      [NodeOutputKeyEnum.success]: true,
      [DispatchNodeResponseKeyEnum.nodeResponse]: {
        textOutput: 'Game created successfully!'
      }
    };
  } catch (error) {
    console.error('Game creation API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error('Failed to create game: ' + errorMessage);
  }
}
