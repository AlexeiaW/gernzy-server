import { Container, interfaces } from 'inversify';
import { TYPES } from '../types/types';
import { GernzyGraphqlService } from '../interfaces/graphqlService';
import { StoreProducts } from '../interfaces/products';
import { GraphqlService } from '../graphqlService';
import { Products } from '../products';
import { GernzySession } from '../interfaces/session';
import { SessionService } from '../session';
import { User } from '../user';
import { GernzyUser } from '../interfaces/user';
import { Cart } from '../cart';
import { GernzyCart } from '../interfaces/cart';
import { GernzyCheckout } from '../interfaces/checkout';
import { Checkout } from '../checkout';
import { Inspector } from '../inspector';
import { GernzyInspector } from '../interfaces/inspector';

const GernzyContainer = new Container();
GernzyContainer.bind<StoreProducts>(TYPES.StoreProducts).to(Products);
GernzyContainer.bind<GernzyGraphqlService>(TYPES.GernzyGraphqlService).to(GraphqlService);
GernzyContainer.bind<GernzySession>(TYPES.GernzySession).to(SessionService);
GernzyContainer.bind<GernzyUser>(TYPES.GernzyUser).to(User);
GernzyContainer.bind<GernzyCart>(TYPES.GernzyCart).to(Cart);
GernzyContainer.bind<GernzyCheckout>(TYPES.GernzyCheckout).to(Checkout);
GernzyContainer.bind<GernzyInspector>(TYPES.GernzyInspector).to(Inspector);

export { GernzyContainer };
