const careerStartDate = new Date(2023, 3, 1); // April 2023

export const getExperience = () => {
  const today = new Date();

  let years = today.getFullYear() - careerStartDate.getFullYear();
  let months = today.getMonth() - careerStartDate.getMonth();

  if (today.getDate() < careerStartDate.getDate()) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years}.${months}`;
};