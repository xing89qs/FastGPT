import {
  FlowNodeInputTypeEnum,
  FlowNodeOutputTypeEnum,
  FlowNodeTypeEnum
} from '../../node/constant';
import { FlowNodeTemplateType } from '../../type/node.d';
import {
  WorkflowIOValueTypeEnum,
  NodeOutputKeyEnum,
  FlowNodeTemplateTypeEnum,
  NodeInputKeyEnum
} from '../../constants';
import { getHandleConfig } from '../utils';
import { i18nT } from '../../../../../web/i18n/utils';

export const GameNode: FlowNodeTemplateType = {
  id: FlowNodeTypeEnum.gameCreator,
  templateType: FlowNodeTemplateTypeEnum.game,
  flowNodeType: FlowNodeTypeEnum.gameCreator,
  sourceHandle: getHandleConfig(false, false, false, false),
  targetHandle: getHandleConfig(false, false, false, true),
  avatar: 'core/workflow/template/gameCreator',
  name: 'Create Game',
  intro: "Create a game based on the user's input",
  courseUrl: '/docs/guide/workbench/workflow/game_creator/',
  version: '1.0.0',
  inputs: [
    {
      key: NodeInputKeyEnum.platform,
      renderTypeList: [FlowNodeInputTypeEnum.select],
      valueType: WorkflowIOValueTypeEnum.string,
      required: true,
      label: 'Platform',
      placeholder: 'Enter the platform',
      list: [
        { label: 'PC', value: 'PC' },
        { label: 'Mobile', value: 'Mobile' }
      ],
      value: 'PC'
    },
    {
      key: NodeInputKeyEnum.operatingSystem,
      renderTypeList: [FlowNodeInputTypeEnum.select],
      valueType: WorkflowIOValueTypeEnum.string,
      required: true,
      label: 'Operating System',
      placeholder: 'Enter the operating system',
      list: [
        { label: 'Windows', value: 'Windows' },
        { label: 'Mac', value: 'Mac' }
      ],
      value: 'Windows'
    }
  ],
  outputs: [
    {
      id: NodeOutputKeyEnum.gameConfig,
      key: NodeOutputKeyEnum.gameConfig,
      label: 'Game Configuration',
      type: FlowNodeOutputTypeEnum.static,
      valueType: WorkflowIOValueTypeEnum.object
    }
  ]
};
