const { ObjectId } = require('mongodb');

const connection = require('../connection');

const createModel = async (itensSold) => {
  const db = await connection();
  const insertSales = await db.collection('sales')
    .insertOne({ itensSold });
  
  const result = { 
    _id: insertSales.insertedId, 
    itensSold,
  };

  return { result };
};

const readByAllModel = async () => {
  const db = await connection();
  const result = await db.collection('sales').find({}).toArray();

  return result;
};

const readByIdModel = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });

  return result;
};

const updateModel = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const result = await db.collection('sales')
    .updateOne(
      { _id: ObjectId(id) }, 
      {
        $set: {
          itensSold,
        },
      },
    );

  return result;
};

module.exports = { 
  createModel,
  readByAllModel,
  readByIdModel,
  updateModel,
};