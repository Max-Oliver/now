import chalk from 'chalk';
import Client from '../client';
import wait from '../output/wait';
import { Domain } from '../../types';

type Response = {
  domain: Domain;
};

export async function getDomain(
  client: Client,
  contextName: string,
  domainName: string
) {
  const cancelWait = wait(
    `Fetching domain ${domainName} under ${chalk.bold(contextName)}`
  );
  try {
    const { domain } = await client.fetch<Response>(
      `/v4/domains/${domainName}`
    );

    cancelWait();

    return domain;
  } catch (error) {
    cancelWait();

    if (500 > error.status) {
      return error;
    }

    throw error;
  }
}