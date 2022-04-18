import joi from 'joi'

const typeCardSchema = joi.string().valid(
    "groceries"
    , "restaurant"
    , "transport"
    , "education"
    , "health"
);

export default typeCardSchema;