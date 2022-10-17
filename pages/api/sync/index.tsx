import type { NextApiRequest, NextApiResponse } from "next";
import { getOfferAndLimitFromReq } from "lib/pagination";
import { airtableBase } from "lib/airtable";
import { productsIndex } from "lib/algolia";

export default function (req: NextApiRequest, res: NextApiResponse) {
  //   const { offset, limit } = getOfferAndLimitFromReq(req, 100, 10000);

  airtableBase("Furniture")
    .select({
      pageSize: 10,
    })
    .eachPage(
      async function (records, fetchNextPage) {
        const objects = records.map((r) => {
          return {
            objectID: r.id,
            ...r.fields,
          };
        });
        await productsIndex.saveObjects(objects);
        console.log("siguiente pagina");

        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.log(err);
          return;
        }
        res.send("termino");
      }
    );
}
