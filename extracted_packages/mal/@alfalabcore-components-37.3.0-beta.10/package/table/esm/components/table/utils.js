import React from 'react';
import { isChildInstanceOf } from '../../utils.js';
import { THead } from '../thead/Component.js';
import 'classnames';
import '../../tslib.es6-a84b316f.js';

function findAllHeadCellsProps(children) {
    var result = [];
    React.Children.forEach(children, function (child) {
        if (isChildInstanceOf(child, THead)) {
            React.Children.forEach(child.props.children, function (headChild) {
                result.push(headChild.props);
            });
        }
    });
    return result;
}

export { findAllHeadCellsProps };
