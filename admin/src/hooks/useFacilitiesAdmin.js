import { useAdminDelete, useAdminList, useAdminSave } from './useAdminCrud';
export const useFacilitiesAdmin = () => useAdminList('facilities', 'facilities', 'name');
export const useSaveFacility = () => useAdminSave('facilities', 'facilities');
export const useDeleteFacility = () => useAdminDelete('facilities', 'facilities');
