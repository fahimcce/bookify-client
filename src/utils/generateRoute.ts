/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
  index?: boolean | any;
  children?: TRoute[];
};
type TRoutPath = {
  name?: string;
  path: string;
  element: ReactNode;
  children?: TRoutPath[] | undefined | any;
};

export const generateRoute = (routePaths: TRoutPath[]) => {
  const route = routePaths.reduce((acc: TRoute[], items) => {
    if (items.path && items.element && !items?.children) {
      acc.push({
        path: items.path,
        element: items.element,
      });
    }
    if (items?.children) {
      // console.log(items.path);
      const mychildren: any = [];
      items?.children?.map((itms: TRoute) => {
        if (itms?.index) {
          mychildren.push({ index: itms.index, element: itms?.element });
        }
        mychildren.push({
          path: itms?.path,
          element: itms?.element,
        });
      });

      acc.push({
        path: items?.path,
        element: items?.element,
        children: mychildren,
      });
    }
    // if (items.children) {
    //   items?.children.forEach((child: TRoutPath) => {
    //     acc.push({
    //       path: `${items.path}/${child.path}`,
    //       element: child.element,
    //     });
    //   });
    // }
    // console.log(acc);
    return acc;
  }, []);
  return route;
};
