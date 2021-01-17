import {
  dayDatasQuery,
  factoryQuery,
  factoryTimeTravelQuery,
  tokenQuery,
  tokenTimeTravelQuery,
  tokensQuery,
  tokensTimeTravelQuery,
} from "../../services/analytics/core/queries/exchange";
import { getOneDayBlock, getSevenDayBlock, getTwoDayBlock } from "../../services/analytics/core/api/blocks";

import { getApollo } from "../../services/analytics/core/apollo";

export async function getFactory(client = getApollo()) {
  const {
    data: { factory },
  } = await client.query({
    query: factoryQuery,
  });

  const {
    data: { factory: oneDay },
  } = await client.query({
    query: factoryTimeTravelQuery,
    variables: {
      block: await getOneDayBlock(),
    },
  });

  const {
    data: { factory: twoDay },
  } = await client.query({
    query: factoryTimeTravelQuery,
    variables: {
      block: await getTwoDayBlock(),
    },
  });

  return {
    ...factory,
    oneDay,
    twoDay,
  };
}
