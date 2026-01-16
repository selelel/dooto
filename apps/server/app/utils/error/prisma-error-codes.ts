export const PRISMA_ERROR_CODES = {
  P2000: {
    name: 'ValueTooLong',
    status: 400,
    message: 'One of the provided values is too long for the allowed field.',
  },
  P2001: {
    name: 'RecordNotFound',
    status: 404,
    message: 'The requested record could not be found.',
  },
  P2002: {
    name: 'UniqueConstraintFailed',
    status: 409,
    message: 'This record already exists and must be unique.',
  },
  P2003: {
    name: 'ForeignKeyConstraintFailed',
    status: 409,
    message: 'This action is not allowed because a related record exists.',
  },
  P2004: {
    name: 'DatabaseConstraintFailed',
    status: 400,
    message: 'The request violates a database constraint.',
  },
  P2005: {
    name: 'InvalidFieldValue',
    status: 400,
    message: 'A stored value does not match the expected field type.',
  },
  P2006: {
    name: 'InvalidValue',
    status: 400,
    message: 'One of the provided values is invalid.',
  },
  P2007: {
    name: 'DataValidationError',
    status: 400,
    message: 'The provided data failed validation.',
  },
  P2008: {
    name: 'QueryParseError',
    status: 400,
    message: 'The request could not be understood due to invalid syntax.',
  },
  P2009: {
    name: 'QueryValidationError',
    status: 400,
    message: 'The request contains an invalid query.',
  },
  P2010: {
    name: 'RawQueryFailed',
    status: 500,
    message: 'The database failed to execute the query.',
  },
  P2011: {
    name: 'NullConstraintViolation',
    status: 400,
    message: 'A required field is missing.',
  },
  P2012: {
    name: 'MissingRequiredValue',
    status: 400,
    message: 'A required value was not provided.',
  },
  P2013: {
    name: 'MissingRequiredArgument',
    status: 400,
    message: 'A required argument is missing.',
  },
  P2014: {
    name: 'RequiredRelationViolation',
    status: 400,
    message: 'This action would break a required relationship.',
  },
  P2015: {
    name: 'RelatedRecordNotFound',
    status: 404,
    message: 'A required related record could not be found.',
  },
  P2016: {
    name: 'QueryInterpretationError',
    status: 400,
    message: 'The database could not interpret the request.',
  },
  P2017: {
    name: 'RelationRecordsNotConnected',
    status: 400,
    message: 'The related records are not properly connected.',
  },
  P2018: {
    name: 'RequiredConnectedRecordsNotFound',
    status: 404,
    message: 'One or more required related records were not found.',
  },
  P2019: {
    name: 'InputError',
    status: 400,
    message: 'The input data is invalid.',
  },
  P2020: {
    name: 'ValueOutOfRange',
    status: 400,
    message: 'A provided value is outside the allowed range.',
  },
  P2021: {
    name: 'TableNotFound',
    status: 404,
    message: 'The required database table does not exist.',
  },
  P2022: {
    name: 'ColumnNotFound',
    status: 404,
    message: 'A required database column does not exist.',
  },
  P2023: {
    name: 'InconsistentColumnData',
    status: 400,
    message: 'The stored data is inconsistent.',
  },
  P2024: {
    name: 'ConnectionPoolTimeout',
    status: 500,
    message: 'The database took too long to respond.',
  },
  P2025: {
    name: 'DependentRecordNotFound',
    status: 404,
    message: 'The operation failed because a required record was not found.',
  },
  P2026: {
    name: 'UnsupportedDatabaseFeature',
    status: 400,
    message: 'This operation is not supported by the database.',
  },
  P2027: {
    name: 'MultipleDatabaseErrors',
    status: 500,
    message: 'Multiple database errors occurred.',
  },
} as const
