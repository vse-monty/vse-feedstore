// "async" is optional
export default async ({ Vue }) => {

  Vue.config.devtools = process.env.NODE_ENV === 'development';
}
