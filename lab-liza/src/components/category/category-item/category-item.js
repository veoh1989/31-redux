import React from 'react';
import {connect} from 'react-redux';
import {renderIf} from '../../../lib/utils.js';
import CategoryForm from '../category-form/category-form';
import {categoryUpdate} from '../../../actions/category-actions';
import {categoryDelete} from '../../../actions/category-actions';

class CategoryItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      category: this.props.category ? this.props.category : undefined,
      updating: false,
    };
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleDoubleClick () {
    this.setState({updating: !this.state.updating});
  }

  handleOnClick () {
    this.props.itemCategoryDelete(this.state);
  }
  render(){
    return(
      <section >
        <h4 onDoubleClick={this.handleDoubleClick}>Category: {this.props.category.title}</h4>
        <div onDoubleClick={this.handleDoubleClick}>Budget: ${this.props.category.budget}</div>
        <button onClick={this.handleOnClick}>delete</button>
        {renderIf(this.state.updating,
          <CategoryForm
            category={this.props.category}
            buttonText='update'
            onComplete={this.props.itemCategoryUpdate}/>
        )}
      </section>
    );
  }
}
const mapStateToProps = state => ({
  categories: state,
});

const mapDispatchToProps = (dispatch, getState) => ({
  itemCategoryUpdate: category => dispatch(categoryUpdate(category)),
  itemCategoryDelete: category => dispatch(categoryDelete(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
