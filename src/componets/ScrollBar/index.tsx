import { Component, CSSProperties, ReactNode } from 'react'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
export default class ScrollBar extends Component<{
    children: ReactNode,
    className: string,
    style?: CSSProperties,
    withTop?: Boolean,
    pt?: string,
    onKeyDown?: () => void
}, {}> {
    container: HTMLDivElement | null = null
    ps: PerfectScrollbar | null = null
    componentDidMount() {
        this.ps = new PerfectScrollbar(this.container as HTMLDivElement, {
            wheelSpeed: 0.3,
            wheelPropagation: true,
            minScrollbarLength: 5,
            maxScrollbarLength: 333,
            scrollXMarginOffset: 4
        });
    }
    render() {
        return (
            <div
                ref={(ref) => { this.container = ref }}
                className={this.props.className}
                onKeyDown={this.props.onKeyDown}
                style={
                    {
                        ...this.props.style,
                        position: 'relative',
                        borderTop: this.props.withTop ? '1px solid rgb(218,220,224)' : '',
                        paddingTop: this.props.pt,
                    }}>
                {this.props.children}
            </div>
        )
    }
}
