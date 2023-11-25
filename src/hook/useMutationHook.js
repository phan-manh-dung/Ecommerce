import { useMutation } from '@tanstack/react-query';

// thay đổi dữ liệu trong redux
export const useMutationHook = (fnCallback) => {
    const mutation = useMutation({
        mutationFn: fnCallback,
    });
    return mutation;
};
