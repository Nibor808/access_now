import { Search } from './model/Search';
import { Request, Response } from 'express';

export const saveSearch = async (req: Request, res: Response) => {
  const { term, selectedItem, timeSinceFirstLoad, userId } = req.body;

  try {
    await Search.create({ term, selectedItem, timeSinceFirstLoad, userId });

    res
      .status(200)
      .send(
        `Search for ${term} with selected item ${
          selectedItem.name
        } saved. App running for ${
          timeSinceFirstLoad / 1000
        } seconds for user ${userId}.`
      );
  } catch (err) {
    res.status(500).send(err);
  }
};
