import { JSX } from "react/jsx-runtime";

export const mdxComponents = {
  h1: (props: JSX.IntrinsicElements['h1']) => <h1 className="text-3xl font-bold" {...props} />,
  p: (props: JSX.IntrinsicElements['p']) => <p className="text-gray-700 leading-7" {...props} />,
  code: (props: JSX.IntrinsicElements['code']) => (
    <code className="bg-gray-100 px-1 rounded" {...props} />
  )
}