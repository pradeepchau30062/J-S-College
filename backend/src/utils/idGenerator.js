export const generateEmployeeId = async (model, prefix) => {
  const count = await model.countDocuments();
  return `${prefix}-${String(count + 1).padStart(4, '0')}`;
};

export const generateStudentId = async (model, levelCode, semester) => {
  const count = await model.countDocuments({ level: levelCode, semester });
  return `JSC-STU-${levelCode.toUpperCase()}-SEM${semester}-${String(count + 1).padStart(4, '0')}`;
};
