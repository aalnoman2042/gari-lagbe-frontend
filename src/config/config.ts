// const config={
//     baseurl : import.meta.env.VITE_BASE_URL
// }


const config = {
  emailjsServiceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  emailjsTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  emailjsPublicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  googleMapApi: import.meta.env.VITE_GOOGLE_MAP_API,
};

export default config;