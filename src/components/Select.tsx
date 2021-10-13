import { FC, useCallback, useState } from "react";
import {
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@material-ui/core";
import { getShops_shops } from "__generated__/getShops";
import { useField } from "formik";

type ShopsOption = Omit<getShops_shops, "__typename">;

type SelectProps = MuiSelectProps & {
  shops: ShopsOption[] | undefined;
  name: string;
};
const Select: FC<SelectProps> = ({ shops, name }) => {
  const [shopId, setShopId] = useState<string>("");
  const [field, meta, helpers] = useField<string>({
    name,
  });
  const { setValue } = helpers;

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  if (!shops) {
    return null;
  }
  return (
    <>
      <InputLabel id="inputLabel">Shop</InputLabel>
      <MuiSelect
        {...field}
        onChange={handleChange}
        name="shopId"
        value={field.value}
        label="Shop"
        labelId="inputLabel"
        variant="outlined"
      >
        {shops
          ? shops.map((shop) => (
              <MenuItem key={shop.id} value={shop.id}>
                {shop.name}
              </MenuItem>
            ))
          : null}
      </MuiSelect>
    </>
  );
};

export default Select;
