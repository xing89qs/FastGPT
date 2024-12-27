import { chats2GPTMessages } from '@fastgpt/global/core/chat/adapt';
import { filterGPTMessageByMaxTokens, loadRequestMessages } from '../../../chat/utils';
import type { ChatItemType } from '@fastgpt/global/core/chat/type.d';
import {
  countMessagesTokens,
  countGptMessagesTokens
} from '../../../../common/string/tiktoken/index';
import { ChatItemValueTypeEnum, ChatRoleEnum } from '@fastgpt/global/core/chat/constants';
import { createChatCompletion } from '../../../ai/config';
import type { ContextExtractAgentItemType } from '@fastgpt/global/core/workflow/template/system/contextExtract/type';
import { NodeInputKeyEnum, NodeOutputKeyEnum } from '@fastgpt/global/core/workflow/constants';
import { DispatchNodeResponseKeyEnum } from '@fastgpt/global/core/workflow/runtime/constants';
import type { ModuleDispatchProps } from '@fastgpt/global/core/workflow/runtime/type';
import { Prompt_ExtractJson } from '@fastgpt/global/core/ai/prompt/agent';
import { replaceVariable, sliceJsonStr } from '@fastgpt/global/common/string/tools';
import { LLMModelItemType } from '@fastgpt/global/core/ai/model.d';
import { getHistories } from '../utils';
import { ModelTypeEnum, getLLMModel } from '../../../ai/model';
import { formatModelChars2Points } from '../../../../support/wallet/usage/utils';
import json5 from 'json5';
import {
  ChatCompletionCreateParams,
  ChatCompletionMessageParam,
  ChatCompletionTool
} from '@fastgpt/global/core/ai/type';
import { ChatCompletionRequestMessageRoleEnum } from '@fastgpt/global/core/ai/constants';
import { DispatchNodeResultType } from '@fastgpt/global/core/workflow/runtime/type';
import { chatValue2RuntimePrompt } from '@fastgpt/global/core/chat/adapt';
import { llmCompletionsBodyFormat } from '../../../ai/utils';

type Props = ModuleDispatchProps<{
  [NodeInputKeyEnum.description]: string;
  [NodeInputKeyEnum.storyContextDialogs]: { role: string; text: string }[];
  [NodeInputKeyEnum.storyChoices]: string[];
}>;
type Response = DispatchNodeResultType<{
  [NodeOutputKeyEnum.success]: boolean;
  [NodeOutputKeyEnum.storyCreation]: { text: string; role: string }[];
  [NodeOutputKeyEnum.storyChoices]: string[];
}>;

type ActionProps = Props & { extractModel: LLMModelItemType };

const agentFunName = 'request_function';

export async function dispatchStoryCreation(props: Props): Promise<Response> {
  const {
    user,
    node: { name },
    histories,
    params: { description, storyContextDialogs, storyChoices }
  } = props;

  if (!description) {
    return Promise.reject('Background setting is empty');
  }

  // Make HTTP request to story creation API
  try {
    const response = await fetch('http://localhost:8111/get_talk_default', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prefix: '',
        choice: '',
        article_setting: description
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    // Convert API response to expected format
    const storyCreation = data.output.map((entry: { txt: string; character: string }) => ({
      text: entry.txt,
      role: entry.character
    }));
    console.log('storyCreation', storyCreation);
    console.log('data.choices---', data.choice);

    return {
      [NodeOutputKeyEnum.success]: true,
      [NodeOutputKeyEnum.storyCreation]: storyCreation,
      [NodeOutputKeyEnum.storyChoices]: data.choice,
      [DispatchNodeResponseKeyEnum.nodeResponse]: {
        storyCreation: storyCreation,
        storyChoices: data.choice
      }
    };
  } catch (error) {
    console.error('Story creation API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error('Failed to create story: ' + errorMessage);
  }
}
