import {
  Box,
  Flex,
  HStack,
  ModalBody,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import MyModal from '@fastgpt/web/components/common/MyModal';
import { useTranslation } from 'next-i18next';
import React, { useMemo, useRef, useState } from 'react';
import {
  ModelProviderList,
  ModelProviderIdType,
  getModelProvider
} from '@fastgpt/global/core/ai/provider';
import MySelect from '@fastgpt/web/components/common/MySelect';
import { modelTypeList, ModelTypeEnum } from '@fastgpt/global/core/ai/model';
import SearchInput from '@fastgpt/web/components/common/Input/SearchInput';
import { useSystemStore } from '@/web/common/system/useSystemStore';
import Avatar from '@fastgpt/web/components/common/Avatar';
import MyTag from '@fastgpt/web/components/common/Tag/index';
import MyTooltip from '@fastgpt/web/components/common/MyTooltip';

const ModelTable = () => {
  const { t } = useTranslation();
  const [provider, setProvider] = useState<ModelProviderIdType | ''>('');
  const providerList = useRef<{ label: any; value: ModelProviderIdType | '' }[]>([
    { label: t('common:common.All'), value: '' },
    ...ModelProviderList.map((item) => ({
      label: (
        <HStack>
          <Avatar src={item.avatar} w={'1rem'} />
          <Box>{t(item.name as any)}</Box>
        </HStack>
      ),
      value: item.id
    }))
  ]);

  const [modelType, setModelType] = useState<ModelTypeEnum | ''>('');
  const selectModelTypeList = useRef<{ label: string; value: ModelTypeEnum | '' }[]>([
    { label: t('common:common.All'), value: '' },
    ...modelTypeList.map((item) => ({ label: t(item.label), value: item.value }))
  ]);

  const [search, setSearch] = useState('');

  const { llmModelList, audioSpeechModelList, vectorModelList, whisperModel } = useSystemStore();

  const modelList = useMemo(() => {
    const formatLLMModelList = llmModelList.map((item) => ({
      ...item,
      typeLabel: t('common:model.type.chat'),
      priceLabel: (
        <Flex color={'myGray.700'}>
          <Box fontWeight={'bold'} color={'myGray.900'} mr={0.5}>
            {item.charsPointsPrice}
          </Box>
          {`${t('common:support.wallet.subscription.point')} / 1K Tokens`}
        </Flex>
      ),
      tagColor: 'blue'
    }));
    const formatVectorModelList = vectorModelList.map((item) => ({
      ...item,
      typeLabel: t('common:model.type.embedding'),
      priceLabel: (
        <Flex color={'myGray.700'}>
          <Box fontWeight={'bold'} color={'myGray.900'} mr={0.5}>
            {item.charsPointsPrice}
          </Box>
          {` ${t('common:support.wallet.subscription.point')} / 1K Tokens`}
        </Flex>
      ),
      tagColor: 'yellow'
    }));
    const formatAudioSpeechModelList = audioSpeechModelList.map((item) => ({
      ...item,
      typeLabel: t('common:model.type.tts'),
      priceLabel: (
        <Flex color={'myGray.700'}>
          <Box fontWeight={'bold'} color={'myGray.900'} mr={0.5}>
            {item.charsPointsPrice}
          </Box>
          {` ${t('common:support.wallet.subscription.point')} / 1K ${t('common:unit.character')}`}
        </Flex>
      ),
      tagColor: 'green'
    }));
    const formatWhisperModel = {
      ...whisperModel,
      typeLabel: t('common:model.type.stt'),
      priceLabel: (
        <Flex color={'myGray.700'}>
          <Box fontWeight={'bold'} color={'myGray.900'} mr={0.5}>
            {whisperModel.charsPointsPrice}
          </Box>
          {` ${t('common:support.wallet.subscription.point')} / 60${t('common:unit.seconds')}`}
        </Flex>
      ),
      tagColor: 'purple'
    };

    const list = (() => {
      if (modelType === ModelTypeEnum.chat) return formatLLMModelList;
      if (modelType === ModelTypeEnum.embedding) return formatVectorModelList;
      if (modelType === ModelTypeEnum.tts) return formatAudioSpeechModelList;
      if (modelType === ModelTypeEnum.stt) return [formatWhisperModel];

      return [
        ...formatLLMModelList,
        ...formatVectorModelList,
        ...formatAudioSpeechModelList,
        formatWhisperModel
      ];
    })();
    const formatList = list.map((item) => {
      const provider = getModelProvider(item.provider);
      return {
        name: item.name,
        avatar: provider.avatar,
        providerId: provider.id,
        providerName: t(provider.name as any),
        typeLabel: item.typeLabel,
        priceLabel: item.priceLabel,
        order: provider.order,
        tagColor: item.tagColor
      };
    });
    formatList.sort((a, b) => a.order - b.order);

    const filterList = formatList.filter((item) => {
      const providerFilter = provider ? item.providerId === provider : true;

      const regx = new RegExp(search, 'i');
      const nameFilter = search ? regx.test(item.name) : true;

      return providerFilter && nameFilter;
    });

    return filterList;
  }, [
    provider,
    modelType,
    llmModelList,
    vectorModelList,
    audioSpeechModelList,
    whisperModel,
    t,
    search
  ]);

  return (
    <Flex flexDirection={'column'} h={'100%'}>
      <Flex>
        <HStack flexShrink={0}>
          <Box fontSize={'sm'} color={'myGray.900'}>
            {t('common:model.provider')}
          </Box>
          <MySelect
            w={'200px'}
            bg={'myGray.50'}
            value={provider}
            onchange={setProvider}
            list={providerList.current}
          />
        </HStack>
        <HStack flexShrink={0} ml={6}>
          <Box fontSize={'sm'} color={'myGray.900'}>
            {t('common:model.model_type')}
          </Box>
          <MySelect
            w={'150px'}
            bg={'myGray.50'}
            value={modelType}
            onchange={setModelType}
            list={selectModelTypeList.current}
          />
        </HStack>
        <Box flex={1} />
        <Box flex={'0 0 250px'}>
          <SearchInput
            bg={'myGray.50'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('common:model.search_name_placeholder')}
          />
        </Box>
      </Flex>
      <TableContainer mt={5} flex={'1 0 0'} h={0} overflowY={'auto'}>
        <Table>
          <Thead>
            <Tr color={'myGray.600'}>
              <Th fontSize={'xs'}>{t('common:model.name')}</Th>
              <Th fontSize={'xs'}>{t('common:model.model_type')}</Th>
              <Th fontSize={'xs'}>{t('common:model.billing')}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {modelList.map((item) => (
              <Tr key={item.name} _hover={{ bg: 'myGray.50' }}>
                <Td fontSize={'sm'}>
                  <MyTooltip title={item.providerName}>
                    <HStack>
                      <Avatar src={item.avatar} w={'1.2rem'} />
                      <Box color={'myGray.900'}>{item.name}</Box>
                    </HStack>
                  </MyTooltip>
                </Td>
                <Td>
                  <MyTag colorSchema={item.tagColor as any}>{item.typeLabel}</MyTag>
                </Td>
                <Td fontSize={'sm'}>{item.priceLabel}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default ModelTable;

export const ModelPriceModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();

  return (
    <MyModal
      isCentered
      iconSrc="/imgs/modal/bill.svg"
      title={t('common:support.wallet.subscription.Ai points')}
      isOpen
      onClose={onClose}
      w={'100%'}
      h={'100%'}
      maxW={'90vw'}
      maxH={'90vh'}
    >
      <ModalBody flex={'1 0 0'}>
        <ModelTable />
      </ModalBody>
    </MyModal>
  );
};
