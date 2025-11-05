import React, { forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import { Calendar } from '../../calendar/modern';
import { Skeleton } from '../../skeleton/modern';

const styles = {"component":"calendar-with-skeleton__component_c6fbh","calendarVisible":"calendar-with-skeleton__calendarVisible_c6fbh","skeleton":"calendar-with-skeleton__skeleton_c6fbh","header":"calendar-with-skeleton__header_c6fbh","weekDays":"calendar-with-skeleton__weekDays_c6fbh","row":"calendar-with-skeleton__row_c6fbh","enter":"calendar-with-skeleton__enter_c6fbh","enterActive":"calendar-with-skeleton__enterActive_c6fbh","exit":"calendar-with-skeleton__exit_c6fbh","exitActive":"calendar-with-skeleton__exitActive_c6fbh"};
require('./index.css');

const CalendarWithSkeleton = forwardRef(({ calendarVisible = true, animate = true, className, ...restProps }, ref) => {
    const skeletonProps = { visible: true, animate };
    return (React.createElement("div", { className: cn(styles.component, className, {
            [styles.calendarVisible]: calendarVisible,
        }) },
        calendarVisible && React.createElement(Calendar, { ref: ref, ...restProps }),
        React.createElement(CSSTransition, { in: !calendarVisible, timeout: 200, unmountOnExit: true, classNames: styles },
            React.createElement("div", { className: styles.skeleton, ref: calendarVisible ? undefined : ref },
                React.createElement(Skeleton, { ...skeletonProps, className: styles.header }),
                React.createElement(Skeleton, { ...skeletonProps, className: styles.weekDays }),
                React.createElement(Skeleton, { ...skeletonProps, className: styles.row }),
                React.createElement(Skeleton, { ...skeletonProps, className: styles.row }),
                React.createElement(Skeleton, { ...skeletonProps, className: styles.row }),
                React.createElement(Skeleton, { ...skeletonProps, className: styles.row }),
                React.createElement(Skeleton, { ...skeletonProps, className: styles.row })))));
});

export { CalendarWithSkeleton };
