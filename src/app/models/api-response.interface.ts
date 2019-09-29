export default interface ApiResponse<T> {
    data: T;
    error: boolean;
    message: string;
}
