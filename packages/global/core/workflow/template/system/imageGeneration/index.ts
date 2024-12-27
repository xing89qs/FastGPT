import {
  FlowNodeInputTypeEnum,
  FlowNodeOutputTypeEnum,
  FlowNodeTypeEnum
} from '../../../node/constant';
import { FlowNodeTemplateType } from '../../../type/node';
import {
  WorkflowIOValueTypeEnum,
  NodeInputKeyEnum,
  NodeOutputKeyEnum,
  FlowNodeTemplateTypeEnum
} from '../../../constants';
import { getHandleConfig } from '../../utils';
import { i18nT } from '../../../../../../web/i18n/utils';
import { Input_Template_UserChatInput } from '../../input';
import { LLMModelTypeEnum } from '../../../../ai/constants';

export const ImageGenerationModule: FlowNodeTemplateType = {
  id: FlowNodeTypeEnum.imageGeneration,
  templateType: FlowNodeTemplateTypeEnum.game,
  flowNodeType: FlowNodeTypeEnum.imageGeneration,
  sourceHandle: getHandleConfig(false, false, false, false),
  targetHandle: getHandleConfig(false, false, false, true),
  avatar: 'core/workflow/template/imageGeneration',
  name: 'imageGeneration',
  intro: 'imageGeneration',
  showStatus: true,
  isTool: true,
  courseUrl: '/docs/guide/workbench/workflow/image_generation/',
  version: '481',
  inputs: [
    {
      key: NodeInputKeyEnum.storyCreation,
      description: 'input texts',
      label: 'input texts',
      renderTypeList: [FlowNodeInputTypeEnum.custom],
      valueType: WorkflowIOValueTypeEnum.any,
      value: []
    }
  ],
  outputs: [
    {
      id: NodeOutputKeyEnum.success,
      key: NodeOutputKeyEnum.success,
      label: 'generationStatus',
      required: true,
      description: 'generationStatus',
      valueType: WorkflowIOValueTypeEnum.boolean,
      type: FlowNodeOutputTypeEnum.static
    }
  ]
};
