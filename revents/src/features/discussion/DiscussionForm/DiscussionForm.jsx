import React, { Component } from "react";
import {
  Segment,
  Form,
  Button,
  Grid,
  Header
} from "semantic-ui-react";
import { connect } from "react-redux";
import { createDiscussion } from "../discussionActions";
import { combineValidators, isRequired } from "revalidate";
import { Field, reduxForm } from "redux-form";
import TextArea from "../../../app/common/form/TextArea"
import TextInput from "../../../app/common/form/TextInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { withFirestore } from "react-redux-firebase";
import { Link } from "react-router-dom";

const mapState = (state, ownProps) => {
  const discussionId = ownProps.match.params.id;

  let discussion = {};

  if (
    state.firestore.ordered.discussions &&
    state.firestore.ordered.discussions.length > 0
  ) {
    discussion =
      state.firestore.ordered.discussions.filter(discussion => discussion.id === discussionId)[0] ||
      {};
  }
  return {
    initial: discussion,
    discussion
  };
};

const actions = {
  createDiscussion
};

const validate = combineValidators({
  title: isRequired({ message: "The discussion post title is required" }),
  description: isRequired({message: "Please write a brief description about the post"}),
  category: isRequired({ message: "The category is required" })
});

const category = [
  { key: "CMPS161", text: "CMPS161", value: "CMPS161" },
  { key: "CMPS280", text: "CMPS280", value: "CMPS280" },
  { key: "CMPS285", text: "CMPS285", value: "CMPS285" },
  { key: "CMPS290", text: "CMPS290", value: "CMPS290" },
  { key: "CMPS390", text: "CMPS390", value: "CMPS390" },
  { key: "CMPS375", text: "CMPS375", value: "CMPS375" },
  { key: "CMPS415", text: "CMPS415", value: "CMPS415" },
  { key: "CMPS431", text: "CMPS431", value: "CMPS431" },
  { key: "CMPS479", text: "CMPS479", value: "CMPS479" },
  { key: "CMPS482", text: "CMPS482", value: "CMPS482" },
  { key: "CMPS411", text: "CMPS411", value: "CMPS411" },
  { key: "CMPS383", text: "CMPS383", value: "CMPS383" },
  { key: "CMPS411", text: "CMPS411", value: "CMPS411" },
  { key: "CMPS315", text: "CMPS315", value: "CMPS315" },
  { key: "CMPS329", text: "CMPS329", value: "CMPS329" },
  { key: "CMPS439", text: "CMPS439", value: "CMPS439" },
  { key: "MATH201", text: "MATH201", value: "MATH201" },
  { key: "MATH392", text: "MATH392", value: "MATH392" },
  { key: "MATH380", text: "MATH380", value: "MATH380" },
  { key: "MATH312", text: "MATH312", value: "MATH312" },
  { key: "MATH350", text: "MATH350", value: "MATH350" }
];

class DiscussionForm extends Component {
  onFormSubmit = async values => {
    try {
        let createdDiscussion = await this.props.createDiscussion(values);
        this.props.history.push(`/discussions/${createdDiscussion.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`discussions/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`discussions/${match.params.id}`);
  }


  render() {
    const { invalid, submitting, pristine } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Discussion Post Details" />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete="off"
            >
              <Field
                name="title"
                component={TextInput}
                placeholder="What is this post about?"
              />

              <Field
                name="description"
                component={TextArea}

                row={3}
                placeholder="Write a brief description about your post"
              />

              <Header
                sub
                color="teal"
                content="Please select the category this post is related to"
              />
              <Field
                name="category"
                component={SelectInput}
                options={category}
                multiple={false}
                placeholder="category"
              />

              <Button
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>

              <Button  as={Link}
            to="/discussions" type="button">Cancel</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: "discussionForm", validate, enableReinitialize: true })(
      DiscussionForm
    )
  )
);
