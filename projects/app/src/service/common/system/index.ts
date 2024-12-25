import { initHttpAgent } from '@fastgpt/service/common/middle/httpAgent';
import { existsSync, readdirSync, readFileSync } from 'fs';
import type { FastGPTFeConfigsType } from '@fastgpt/global/common/system/types/index.d';
import type { FastGPTConfigFileType } from '@fastgpt/global/common/system/types/index.d';
import { PluginSourceEnum } from '@fastgpt/global/core/plugin/constants';
import { getFastGPTConfigFromDB } from '@fastgpt/service/common/system/config/controller';
import { PluginTemplateType } from '@fastgpt/global/core/plugin/type';
import { FastGPTProUrl } from '@fastgpt/service/common/system/constants';
import { isProduction } from '@fastgpt/global/common/system/constants';
import { initFastGPTConfig } from '@fastgpt/service/common/system/tools';
import json5 from 'json5';
import { SystemPluginTemplateItemType } from '@fastgpt/global/core/workflow/type';
import { defaultGroup } from '@fastgpt/web/core/workflow/constants';
import { MongoPluginGroups } from '@fastgpt/service/core/app/plugin/pluginGroupSchema';

export const readConfigData = (name: string) => {
  const splitName = name.split('.');
  const devName = `${splitName[0]}.local.${splitName[1]}`;

  const filename = (() => {
    if (!isProduction) {
      // check local file exists
      const hasLocalFile = existsSync(`data/${devName}`);
      if (hasLocalFile) {
        return `data/${devName}`;
      }
      return `data/${name}`;
    }
    // production path
    return `/app/data/${name}`;
  })();

  const content = readFileSync(filename, 'utf-8');

  return content;
};

/* Init global variables */
export function initGlobalVariables() {
  if (global.communityPlugins) return;

  global.communityPlugins = [];
  global.qaQueueLen = global.qaQueueLen ?? 0;
  global.vectorQueueLen = global.vectorQueueLen ?? 0;
  initHttpAgent();
}

/* Init system data(Need to connected db). It only needs to run once */
export async function getInitConfig() {
  return Promise.all([
    initSystemConfig(),
    getSystemVersion(),

    // abandon
    getSystemPlugin()
  ]);
}

const defaultFeConfigs: FastGPTFeConfigsType = {
  show_emptyChat: true,
  show_git: true,
  docUrl: 'https://doc.tryfastgpt.ai',
  openAPIDocUrl: 'https://doc.tryfastgpt.ai/docs/development/openapi',
  systemPluginCourseUrl: 'https://fael3z0zfze.feishu.cn/wiki/ERZnw9R26iRRG0kXZRec6WL9nwh',
  appTemplateCourse:
    'https://fael3z0zfze.feishu.cn/wiki/CX9wwMGyEi5TL6koiLYcg7U0nWb?fromScene=spaceOverview',
  systemTitle: 'FastGPT',
  concatMd:
    '项目开源地址: [FastGPT GitHub](https://github.com/labring/FastGPT)\n交流群: ![](https://oss.laf.run/otnvvf-imgs/fastgpt-feishu1.png)',
  limit: {
    exportDatasetLimitMinutes: 0,
    websiteSyncLimitMinuted: 0
  },
  scripts: [],
  favicon: '/favicon.ico',
  uploadFileMaxSize: 500
};

export async function initSystemConfig() {
  // load config
  const [{ config: dbConfig, configId }, fileConfig] = await Promise.all([
    getFastGPTConfigFromDB(),
    readConfigData('config.json')
  ]);
  const fileRes = json5.parse(fileConfig) as FastGPTConfigFileType;

  // get config from database
  const config: FastGPTConfigFileType = {
    feConfigs: {
      ...fileRes?.feConfigs,
      ...defaultFeConfigs,
      ...(dbConfig.feConfigs || {}),
      isPlus: !!FastGPTProUrl
    },
    systemEnv: {
      ...fileRes.systemEnv,
      ...(dbConfig.systemEnv || {})
    },
    subPlans: dbConfig.subPlans || fileRes.subPlans,
    llmModels: dbConfig.llmModels || fileRes.llmModels || [],
    vectorModels: dbConfig.vectorModels || fileRes.vectorModels || [],
    reRankModels: dbConfig.reRankModels || fileRes.reRankModels || [],
    audioSpeechModels: dbConfig.audioSpeechModels || fileRes.audioSpeechModels || [],
    whisperModel: dbConfig.whisperModel || fileRes.whisperModel
  };

  // set config
  global.systemInitBufferId = configId;
  initFastGPTConfig(config);

  console.log({
    feConfigs: global.feConfigs,
    systemEnv: global.systemEnv,
    subPlans: global.subPlans,
    llmModels: global.llmModels,
    vectorModels: global.vectorModels,
    reRankModels: global.reRankModels,
    audioSpeechModels: global.audioSpeechModels,
    whisperModel: global.whisperModel
  });
}

function getSystemVersion() {
  if (global.systemVersion) return;
  try {
    if (process.env.NODE_ENV === 'development') {
      global.systemVersion = process.env.npm_package_version || '0.0.0';
    } else {
      const packageJson = json5.parse(readFileSync('/app/package.json', 'utf-8'));

      global.systemVersion = packageJson?.version;
    }
    console.log(`System Version: ${global.systemVersion}`);
  } catch (error) {
    console.log(error);

    global.systemVersion = '0.0.0';
  }
}

function getSystemPlugin() {
  if (global.communityPlugins && global.communityPlugins.length > 0) return;

  const basePath =
    process.env.NODE_ENV === 'development' ? 'data/pluginTemplates' : '/app/data/pluginTemplates';
  // read data/pluginTemplates directory, get all json file
  const files = readdirSync(basePath);
  // filter json file
  const filterFiles = files.filter((item) => item.endsWith('.json'));

  // read json file
  const fileTemplates = filterFiles.map<SystemPluginTemplateItemType>((filename) => {
    const content = readFileSync(`${basePath}/${filename}`, 'utf-8');
    return {
      ...json5.parse(content),
      originCost: 0,
      currentCost: 0,
      id: `${PluginSourceEnum.community}-${filename.replace('.json', '')}`
    };
  });

  fileTemplates.sort((a, b) => (b.weight || 0) - (a.weight || 0));

  global.communityPlugins = fileTemplates;
}

export async function initSystemPlugins() {
  try {
    const { groupOrder, ...restDefaultGroup } = defaultGroup;
    await MongoPluginGroups.updateOne(
      {
        groupId: defaultGroup.groupId
      },
      {
        $set: restDefaultGroup
      },
      {
        upsert: true
      }
    );
  } catch (error) {
    console.error('Error initializing system plugins:', error);
  }
}
