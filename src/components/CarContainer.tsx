import * as React from "react";
import { connect } from "react-redux";
import * as Redux from "redux";
import * as UUID from "uuid";
import { Car, ApplicationState } from "../data/models";
import { addCar } from "../data/actions";
import CarListItem from "./CarListItem";

// Properties to get from Redux Store
interface StoreProps {
  cars: Car[];
}

// Properties to get for Redux Dispactch
interface DispatchProps {
  insertCar: (car: Car) => void;
}

// Properties external to Redux Store
export interface OwnProps {
  // No properties
}

type CombinedProps = StoreProps & DispatchProps & OwnProps;

class CarContainer extends React.Component<CombinedProps, {}> {
  constructor(props: CombinedProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <table>
        <thead>
          <tr>
            <th>Manufacturer</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.props.cars.forEach(car => <CarListItem car={car} />)}
          {this.props.children}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps( state: ApplicationState, ownProps: OwnProps ): StoreProps {
  return {
    cars: state.cars
  };
}

function mapDispatchToProps( dispatch: Redux.Dispatch, ownProps: OwnProps ): DispatchProps {
  return {
    insertCar: car => dispatch(addCar(car))
  };
}

const wrapper = connect<StoreProps, DispatchProps, OwnProps>( mapStateToProps, mapDispatchToProps );

export default wrapper(CarContainer);
