import React from 'react';
import { Box } from '@chakra-ui/react';
import { NodeProps } from 'reactflow';
import { FlowNodeItemType } from '@fastgpt/global/core/workflow/type/node.d';
import { useTranslation } from 'next-i18next';
import NodeCard from '../render/NodeCard';
import Container from '../../components/Container';
import { NodeInputKeyEnum } from '@fastgpt/global/core/workflow/constants';
import RenderInput from '../render/RenderInput';
import RenderOutput from '../render/RenderOutput';
import { useContextSelector } from 'use-context-selector';
import { WorkflowContext } from '../../../context';
import IOTitle from '../../components/IOTitle';
import RenderToolInput from '../render/RenderToolInput';

const NodeGame = ({ data, selected }: NodeProps<FlowNodeItemType>) => {
  const { inputs, outputs, nodeId } = data;
  const { t } = useTranslation();
  const onChangeNode = useContextSelector(WorkflowContext, (v) => v.onChangeNode);

  const splitToolInputs = useContextSelector(WorkflowContext, (ctx) => ctx.splitToolInputs);
  const { isTool, commonInputs } = splitToolInputs(inputs, nodeId);

  return (
    <Box as={NodeCard} minW={'400px'} selected={selected} {...data}>
      {isTool && (
        <Box as={Container}>
          <Box as={RenderToolInput} nodeId={nodeId} inputs={inputs} />
        </Box>
      )}
      <Container>
        <IOTitle text={t('common:common.Input')} />
        <RenderInput nodeId={nodeId} flowInputList={commonInputs} />
      </Container>
      <Container>
        <IOTitle text={t('common:common.Output')} />
        <RenderOutput nodeId={nodeId} flowOutputList={outputs} />
      </Container>
    </Box>
  );
};

export default React.memo(NodeGame);
