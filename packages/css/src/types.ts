import {
  StandardLonghandProperties,
  StandardShorthandProperties,
} from "csstype";

export type AllCssProps = Required<
  Omit<
    StandardLonghandProperties & StandardShorthandProperties,
    "border" | "background" | "transition"
  >
>;

export interface IScreens {
  [key: string]: (css: string) => string;
}

export interface IAtom {
  id: string;
  cssPropParts: string[];
  value: string;
  pseudo: string | undefined;
  screen: string;
  _className?: string;
  toString: (this: IAtom) => string;
}

export interface IComposedAtom {
  atoms: IAtom[];
  _className?: string;
  toString: (this: IComposedAtom) => string;
}

export interface ICssPropToToken {
  color: "colors";
  backgroundColor: "colors";
  margin: "space";
  marginTop: "space";
  marginLeft: "space";
  marginRight: "space";
  marginBottom: "space";
  padding: "space";
  paddingTop: "space";
  paddingLeft: "space";
  paddingRight: "space";
  paddingBottom: "space";
  gridGap: "space";
  gridColumnGap: "space";
  gridRowGap: "space";
  fontSize: "fontSizes";
  borderColor: "colors";
  borderTopColor: "colors";
  borderLeftColor: "colors";
  borderRightColor: "colors";
  borderBottomColor: "colors";
  fontFamily: "fonts";
  fontWeight: "fontWeights";
  lineHeight: "lineHeights";
  letterSpacing: "letterSpacings";
  width: "sizes";
  height: "sizes";
  minWidth: "sizes";
  maxWidth: "sizes";
  minHeight: "sizes";
  maxHeight: "sizes";
  borderWidth: "borderWidths";
  borderTopWidth: "borderWidths";
  borderLeftWidth: "borderWidths";
  borderRightWidth: "borderWidths";
  borderBottomWidth: "borderWidths";
  borderStyle: "borderStyles";
  borderTopStyle: "borderStyles";
  borderLeftStyle: "borderStyles";
  borderRightStyle: "borderStyles";
  borderBottomStyle: "borderStyles";
  borderRadius: "radii";
  borderTopLeftRadius: "radii";
  borderTopRightRadius: "radii";
  borderBottomRightRadius: "radii";
  borderBottomLeftRadius: "radii";
  boxShadow: "shadows";
  textShadow: "shadows";
  zIndex: "zIndices";
  transition: "transitions";
}

export interface ITokenDefinition {
  [key: string]: string;
  [key: number]: string;
}

export interface ITokensDefinition {
  colors?: ITokenDefinition;
  space?: ITokenDefinition;
  fontSizes?: ITokenDefinition;
  fonts?: ITokenDefinition;
  fontWeights?: ITokenDefinition;
  lineHeights?: ITokenDefinition;
  letterSpacings?: ITokenDefinition;
  sizes?: ITokenDefinition;
  borderWidths?: ITokenDefinition;
  borderStyles?: ITokenDefinition;
  radii?: ITokenDefinition;
  shadows?: ITokenDefinition;
  zIndices?: ITokenDefinition;
  transitions?: ITokenDefinition;
}

export interface IConfig {
  prefix?: string;
  screens?: IScreens;
  tokens?: ITokensDefinition;
  utils?: {
    [name: string]: (css: TCss<any>) => (...args: any[]) => string;
  };
}

export type TCss<T extends IConfig> = {
  [K in keyof AllCssProps]: (
    value: K extends keyof ICssPropToToken
      ? T["tokens"] extends object
        ? T["tokens"][ICssPropToToken[K]] extends object
          ? keyof T["tokens"][ICssPropToToken[K]]
          : K extends keyof AllCssProps
          ? AllCssProps[K]
          : string
        : K extends keyof AllCssProps
        ? AllCssProps[K]
        : string
      : K extends keyof AllCssProps
      ? AllCssProps[K]
      : string,
    pseudo?: string
  ) => string;
} &
  {
    [U in keyof T["utils"]]: T["utils"][U] extends (
      css: TCss<any>
    ) => (...args: infer P) => string
      ? (...args: P) => string
      : never;
  } &
  {
    [S in keyof T["screens"]]: {
      [K in keyof AllCssProps]: (
        value: K extends keyof ICssPropToToken
          ? T["tokens"] extends object
            ? T["tokens"][ICssPropToToken[K]] extends object
              ? keyof T["tokens"][ICssPropToToken[K]]
              : K extends keyof AllCssProps
              ? AllCssProps[K]
              : string
            : K extends keyof AllCssProps
            ? AllCssProps[K]
            : string
          : K extends keyof AllCssProps
          ? AllCssProps[K]
          : string,
        pseudo?: string
      ) => string;
    };
  } & {
    compose: (...compositions: string[]) => string;
    getStyles: () => string;
  };

export interface ISheet {
  cssRules: any[];
  content: string;
  insertRule(rule: string): void;
}
