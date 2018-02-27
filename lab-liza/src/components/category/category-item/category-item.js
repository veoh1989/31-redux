import React from 'react';
import CategoryForm from '../category-form/category-form';
import {renderIf} from '../../../lib/utils.js';
import {connect} from 'react-redux';
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
  }

  handleDoubleClick () {
    this.setState({updating: !this.state.updating});
  }
  render(){
    return(
      <section onDoubleClick={this.handleDoubleClick}>
        <h4>Category: {this.props.category.title}</h4>
        <div>Budget: ${this.props.category.budget}</div>
        {renderIf(this.state.updating,
          <CategoryForm
            category={this.props.category}
            buttonText='update'
            onComplete={this.props.itemCategoryUpdate}/>
        )}
        <button></button>
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
