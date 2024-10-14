export const config = {
  bucketLifecyclePolicy: {
    id: 'lifecycle-policy',
    status: 'Enabled',
    prefix: 'SourceArti/',
    transitionInDays: 30,
    expirationInDays: 300,
  },
};
