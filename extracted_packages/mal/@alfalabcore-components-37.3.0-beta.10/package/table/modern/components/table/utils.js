import React from 'react';
import { isChildInstanceOf } from '../../utils.js';
import { THead } from '../thead/Component.js';
import 'classnames';

function findAllHeadCellsProps(children) {
    const result = [];
    React.Children.forEach(children, (child) => {
        if (isChildInstanceOf(child, THead)) {
            React.Children.forEach(child.props.children, (headChild) => {
                result.push(headChild.props);
            });
        }
    });
    return result;
}

export { findAllHeadCellsProps };
