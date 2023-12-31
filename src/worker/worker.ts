

import { Worker } from '@temporalio/worker';
import * as activities from './activities';

// @@@SNIPSTART typescript-production-worker
const workflowOption = () =>
  process.env.NODE_ENV === 'production'
    ? {
      workflowBundle: {
        codePath: require.resolve('../data/workflow-bundle.bs'),
      },
    }
    : { workflowsPath: require.resolve('./workflows') };

export async function run() {
  const worker = await Worker.create({
    ...workflowOption(),
    activities,
    taskQueue: 'production-sample',
  });

  await worker.run();
}
// @@@SNIPEND
