import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { AsyncKingKongModule } from '../../../redux-file/actions-creators'
import { Toast } from 'antd-mobile';
import './index.less'
import LazyLoad from 'react-lazyload';
function loadingToast() {
    Toast.loading('Loading...', .5, () => {
    });
}
class App extends React.Component {
    componentDidMount() {
        this.props.reqKingKongModule()
    }
    handleClick = (item) => {
        return () => {
            loadingToast()
            setTimeout(() => {
                this.props.history.push({ pathname: '/shop', state: { data: item } })
            }, 500)
        }

    }
    render() {
        const { KingkongModule } = this.props
        return (
            <div className="KingkongModule overflow" >
                <LazyLoad height={200} offset={100} className="overflow">
                    {KingkongModule.map((item, index) => {
                        return <div onClick={this.handleClick(item)} className="kingkong-item " key={`${index + 10}`}>
                            <img src={item.picUrl} alt="" />
                            <span>{item.text}</span></div>
                    })}
                </LazyLoad>
            </div >

        )
    }
}

export default withRouter(connect(
    (state) => ({ KingkongModule: state.KingKong }),
    (dispatch) => ({
        reqKingKongModule() {
            const action = AsyncKingKongModule();
            dispatch(action)
        },

    })
)(App))