import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  HStack,
  Input,
  Select
} from '@chakra-ui/react';
import { NodeProps, Position, Handle as SourceHandle } from 'reactflow';
import { FlowNodeItemType } from '@fastgpt/global/core/workflow/type/node.d';
import { useTranslation } from 'next-i18next';
import NodeCard from '../render/NodeCard';
import Container from '../../components/Container';
import { AddIcon } from '@chakra-ui/icons';
import RenderInput from '../render/RenderInput';
import type { ContextExtractAgentItemType } from '@fastgpt/global/core/workflow/template/system/contextExtract/type';
import RenderOutput from '../render/RenderOutput';
import MyIcon from '@fastgpt/web/components/common/Icon';
import ExtractFieldModal, { defaultField } from './ExtractFieldModal';
import { NodeInputKeyEnum } from '@fastgpt/global/core/workflow/constants';
import { FlowNodeOutputTypeEnum } from '@fastgpt/global/core/workflow/node/constant';
import { WorkflowIOValueTypeEnum } from '@fastgpt/global/core/workflow/constants';
import RenderToolInput from '../render/RenderToolInput';
import {
  FlowNodeInputItemType,
  FlowNodeOutputItemType
} from '@fastgpt/global/core/workflow/type/io.d';
import { getNanoid } from '@fastgpt/global/common/string/tools';
import IOTitle from '../../components/IOTitle';
import { useContextSelector } from 'use-context-selector';
import { WorkflowContext } from '../../../context';
import MyTooltip from '@fastgpt/web/components/common/MyTooltip';
import MyIconButton from '@fastgpt/web/components/common/Icon/button';
import { getHandleId } from '@fastgpt/global/core/workflow/utils';

const NodeStoryCreation = ({ data, selected }: NodeProps<FlowNodeItemType>) => {
  const { inputs, outputs, nodeId } = data;

  const { t } = useTranslation();
  const onChangeNode = useContextSelector(WorkflowContext, (v) => v.onChangeNode);

  const splitToolInputs = useContextSelector(WorkflowContext, (ctx) => ctx.splitToolInputs);
  const { isTool, commonInputs } = splitToolInputs(inputs, nodeId);
  const [editExtractFiled, setEditExtractField] = useState<ContextExtractAgentItemType>();

  const CustomComponent = useMemo(
    () => ({
      [NodeInputKeyEnum.storyContextDialogs]: ({
        key: dialogKey,
        value = [],
        ...props
      }: FlowNodeInputItemType) => {
        const dialogs = value as { role: string; text: string }[];
        return (
          <Box>
            {dialogs.map((item, i) => (
              <Box key={item.role} mb={4}>
                <HStack spacing={1}>
                  <MyTooltip label={t('common:common.Delete')}>
                    <MyIcon
                      mt={0.5}
                      name={'minus'}
                      w={'0.8rem'}
                      cursor={'pointer'}
                      color={'myGray.600'}
                      _hover={{ color: 'red.600' }}
                      onClick={() => {
                        onChangeNode({
                          nodeId,
                          type: 'updateInput',
                          key: dialogKey,
                          value: {
                            ...props,
                            key: dialogKey,
                            value: dialogs.filter((dialog) => dialog.role !== item.role)
                          }
                        });
                      }}
                    />
                  </MyTooltip>
                  <Box color={'myGray.600'} fontWeight={'medium'} fontSize={'sm'}>
                    {t('common:dialog') + '-' + (i + 1)}
                  </Box>
                </HStack>
                <Box mt={1}>
                  <HStack alignItems="center" mb={2}>
                    <Box width="60px" fontSize="sm" color="myGray.600">
                      Role
                    </Box>
                    <Input
                      defaultValue={item.role}
                      placeholder="Role"
                      bg={'white'}
                      fontSize={'sm'}
                      onChange={(e) => {
                        const newVal = dialogs.map((val) =>
                          val.role === item.role
                            ? {
                                ...val,
                                role: e.target.value
                              }
                            : val
                        );
                        onChangeNode({
                          nodeId,
                          type: 'updateInput',
                          key: dialogKey,
                          value: {
                            ...props,
                            key: dialogKey,
                            value: newVal
                          }
                        });
                      }}
                    />
                  </HStack>
                  <HStack alignItems="center">
                    <Box width="60px" fontSize="sm" color="myGray.600">
                      Text
                    </Box>
                    <Input
                      defaultValue={item.text}
                      placeholder="Content"
                      bg={'white'}
                      fontSize={'sm'}
                      onChange={(e) => {
                        const newVal = dialogs.map((val) =>
                          val.role === item.role
                            ? {
                                ...val,
                                text: e.target.value
                              }
                            : val
                        );
                        onChangeNode({
                          nodeId,
                          type: 'updateInput',
                          key: dialogKey,
                          value: {
                            ...props,
                            key: dialogKey,
                            value: newVal
                          }
                        });
                      }}
                    />
                  </HStack>
                </Box>
              </Box>
            ))}
            <Button
              fontSize={'sm'}
              leftIcon={<MyIcon name={'common/addLight'} w={4} />}
              onClick={() => {
                onChangeNode({
                  nodeId,
                  type: 'updateInput',
                  key: dialogKey,
                  value: {
                    ...props,
                    key: dialogKey,
                    value: dialogs.concat([{ role: '', text: '' }])
                  }
                });
              }}
            >
              {t('common:core.module.Add_dialog')}
            </Button>
          </Box>
        );
      },
      [NodeInputKeyEnum.storyChoices]: ({
        key: optionKey,
        value = [],
        ...props
      }: FlowNodeInputItemType) => {
        const options = value as string[];
        return (
          <Box>
            {options.map((item, i) => (
              <Box key={i} mb={4}>
                <HStack spacing={1}>
                  <MyTooltip label={t('common:common.Delete')}>
                    <MyIcon
                      mt={0.5}
                      name={'minus'}
                      w={'0.8rem'}
                      cursor={'pointer'}
                      color={'myGray.600'}
                      _hover={{ color: 'red.600' }}
                      onClick={() => {
                        onChangeNode({
                          nodeId,
                          type: 'updateInput',
                          key: optionKey,
                          value: {
                            ...props,
                            key: optionKey,
                            value: options.filter((_, index) => index !== i)
                          }
                        });
                      }}
                    />
                  </MyTooltip>
                  <Box color={'myGray.600'} fontWeight={'medium'} fontSize={'sm'}>
                    {t('common:option') + (i + 1)}
                  </Box>
                </HStack>
                <Box position={'relative'} mt={1}>
                  <Input
                    as="textarea"
                    defaultValue={item}
                    bg={'white'}
                    fontSize={'sm'}
                    padding={'8px 12px'}
                    resize={'vertical'}
                    minH={'40px'}
                    overflow={'hidden'}
                    sx={{
                      '&::-webkit-scrollbar': {
                        display: 'none'
                      }
                    }}
                    onChange={(e) => {
                      const newVal = options.map((val, index) =>
                        index === i ? e.target.value : val
                      );
                      onChangeNode({
                        nodeId,
                        type: 'updateInput',
                        key: optionKey,
                        value: {
                          ...props,
                          key: optionKey,
                          value: newVal
                        }
                      });
                    }}
                  />
                  <SourceHandle
                    nodeId={nodeId}
                    handleId={getHandleId(nodeId, 'source', `option${i}`)}
                    position={Position.Right}
                    translate={[34, 0]}
                  />
                </Box>
              </Box>
            ))}
            <Button
              fontSize={'sm'}
              leftIcon={<MyIcon name={'common/addLight'} w={4} />}
              onClick={() => {
                onChangeNode({
                  nodeId,
                  type: 'updateInput',
                  key: optionKey,
                  value: {
                    ...props,
                    key: optionKey,
                    value: options.concat([''])
                  }
                });
              }}
            >
              {t('common:core.module.Add_choices')}
            </Button>
          </Box>
        );
      }
    }),
    [nodeId, onChangeNode, t]
  );
  return (
    <Box as={NodeCard} minW={'400px'} selected={selected} {...data}>
      {isTool && (
        <>
          <Box as={Container}>
            <Box as={RenderToolInput} nodeId={nodeId} inputs={inputs} />
          </Box>
        </>
      )}
      <>
        <Container>
          <IOTitle text={t('common:common.Input')} />
          <RenderInput
            nodeId={nodeId}
            flowInputList={commonInputs}
            CustomComponent={CustomComponent}
          />
        </Container>
      </>
      <>
        <Container>
          <IOTitle text={t('common:common.Output')} />
          <RenderOutput nodeId={nodeId} flowOutputList={outputs} />
        </Container>
      </>

      {!!editExtractFiled && (
        <ExtractFieldModal
          defaultField={editExtractFiled}
          onClose={() => setEditExtractField(undefined)}
          onSubmit={(data) => {
            const input = inputs.find(
              (input) => input.key === NodeInputKeyEnum.extractKeys
            ) as FlowNodeInputItemType;
            const extracts: ContextExtractAgentItemType[] = input.value || [];

            const exists = extracts.find((item) => item.key === editExtractFiled.key);

            const newInputs = exists
              ? extracts.map((item) => (item.key === editExtractFiled.key ? data : item))
              : extracts.concat(data);

            onChangeNode({
              nodeId,
              type: 'updateInput',
              key: NodeInputKeyEnum.extractKeys,
              value: {
                ...input,
                value: newInputs
              }
            });

            const newOutput: FlowNodeOutputItemType = {
              id: getNanoid(),
              key: data.key,
              label: `${t('common:extraction_results')}-${data.desc}`,
              valueType: data.valueType || WorkflowIOValueTypeEnum.string,
              type: FlowNodeOutputTypeEnum.static
            };

            if (exists) {
              if (editExtractFiled.key === data.key) {
                const output = outputs.find(
                  (output) => output.key === data.key
                ) as FlowNodeOutputItemType;

                // update
                onChangeNode({
                  nodeId,
                  type: 'updateOutput',
                  key: data.key,
                  value: {
                    ...output,
                    valueType: newOutput.valueType,
                    label: newOutput.label
                  }
                });
              } else {
                onChangeNode({
                  nodeId,
                  type: 'replaceOutput',
                  key: editExtractFiled.key,
                  value: newOutput
                });
              }
            } else {
              onChangeNode({
                nodeId,
                type: 'addOutput',
                value: newOutput
              });
            }

            setEditExtractField(undefined);
          }}
        />
      )}
    </Box>
  );
};

export default React.memo(NodeStoryCreation);
