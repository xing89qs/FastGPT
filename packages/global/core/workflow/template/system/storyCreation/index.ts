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
import { Input_Template_SelectAIModel, Input_Template_History } from '../../input';
import { LLMModelTypeEnum } from '../../../../ai/constants';
import { getHandleConfig } from '../../utils';
import { i18nT } from '../../../../../../web/i18n/utils';

export const StoryCreationModule: FlowNodeTemplateType = {
  id: FlowNodeTypeEnum.storyCreation,
  templateType: FlowNodeTemplateTypeEnum.game,
  flowNodeType: FlowNodeTypeEnum.storyCreation,
  sourceHandle: getHandleConfig(true, true, true, true),
  targetHandle: getHandleConfig(true, true, true, true),
  avatar: 'core/workflow/template/storyCreation',
  name: i18nT('workflow:story_creation'),
  intro: i18nT('workflow:intro_story_creation'),
  showStatus: true,
  isTool: true,
  courseUrl: '/docs/guide/workbench/workflow/content_extract/',
  version: '481',
  inputs: [
    {
      key: NodeInputKeyEnum.description,
      renderTypeList: [FlowNodeInputTypeEnum.textarea, FlowNodeInputTypeEnum.reference],
      valueType: WorkflowIOValueTypeEnum.string,
      label: i18nT('workflow:story_creation_background_setting'),
      description: i18nT('workflow:story_creation_background_setting_tip'),
      placeholder: i18nT('workflow:story_creation_background_setting_placeholder')
    },
    {
      key: NodeInputKeyEnum.storyContextDialogs,
      renderTypeList: [FlowNodeInputTypeEnum.custom],
      valueType: WorkflowIOValueTypeEnum.any,
      label: '',
      value: []
    },
    {
      key: NodeInputKeyEnum.storyChoices,
      renderTypeList: [FlowNodeInputTypeEnum.custom],
      valueType: WorkflowIOValueTypeEnum.any,
      label: '',
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
    },
    {
      id: NodeOutputKeyEnum.storyCreation,
      key: NodeOutputKeyEnum.storyCreation,
      label: 'storyCreation',
      required: true,
      valueType: WorkflowIOValueTypeEnum.arrayDialog,
      type: FlowNodeOutputTypeEnum.static
    },
    {
      id: NodeOutputKeyEnum.storyChoices,
      key: NodeOutputKeyEnum.storyChoices,
      label: 'storyChoices',
      required: true,
      valueType: WorkflowIOValueTypeEnum.arrayString,
      type: FlowNodeOutputTypeEnum.static
    }
  ]
};
