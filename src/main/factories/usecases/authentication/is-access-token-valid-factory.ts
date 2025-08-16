import { IsAccessTokenValid } from '../../../../data/use-cases/is-accesstoken-valid'

export const makeIsAccessTokenValid = () => {
  return new IsAccessTokenValid()
}
