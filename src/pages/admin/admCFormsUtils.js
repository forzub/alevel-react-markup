
export const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
    text: null,
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export  const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

