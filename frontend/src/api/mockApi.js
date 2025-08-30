// 백엔드 API가 없으므로, 프론트엔드 테스트를 위한 목업(mock) 함수
export const mockApi = (data, delay = 500) => 
  new Promise((resolve, reject) => setTimeout(() => {
    // 실제 API처럼 랜덤하게 에러 발생 테스트
    // if (Math.random() > 0.8) {
    //   reject(new Error("500 Internal Server Error"));
    // }
    resolve(data);
  }, delay));