/// <reference types="react" />
import React from 'react';
import { Styles, TabListTitle } from "../../typings";
declare const Title: React.ForwardRefExoticComponent<TabListTitle & Styles & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "id"> & {
    focused?: boolean | undefined;
    isOption?: boolean | undefined;
} & React.RefAttributes<HTMLButtonElement>>;
export { Title };
