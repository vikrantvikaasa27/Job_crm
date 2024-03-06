export const categoryPlaceholder = (amount: number) => {
  return Array(amount)
    .fill('')
    .map((_, i) => ({
      id: i,
      name: 'Placeholder',
      _count: {
        jobs: 0,
      },
    }));
};

export const industryPlaceholder = (amount: number) => {
  return Array(amount)
    .fill('')
    .map((_, i) => ({
      id: i,
      name: 'Placeholder',
    }));
};
