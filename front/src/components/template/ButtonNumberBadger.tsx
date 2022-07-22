import { Button } from '@mantine/core';
import { Dispatch, SetStateAction, useEffect, useMemo, useState, ReactNode } from 'react';
import { Number0, Number1, Number2, Number3, Number4, Number5, Number6, Number7, Number8, Number9, Icon, QuestionMark } from 'tabler-icons-react';
import { LabelPriority } from '../../types/Template';

interface ButtonNumberBadgerProps {
    value: string;
    labelPriority: LabelPriority;
    setLabelPriority: Dispatch<SetStateAction<LabelPriority>>;
    higherPriority: number;
}

const ICONS: Record<number, Icon> = {
    0: QuestionMark,
    1: Number1,
    2: Number2,
    3: Number3,
    4: Number4,
    5: Number5,
    6: Number6,
    7: Number7,
    8: Number8,
    9: Number9,
};
const ICONS_LENGTH = Object.keys(ICONS).length;

export function ButtonNumberBadger({ value, labelPriority, setLabelPriority, higherPriority }: ButtonNumberBadgerProps) {
    const [localPriority, setLocalPriority] = useState<number>(0);
    const [isDisabled, setDisabled] = useState(false);

    const onBtnClick = () => {
        if (isDisabled) return;

        setLabelPriority((oldPriority: LabelPriority) => {
            const nextPriority = higherPriority + 1;
            return { ...oldPriority, [value]: nextPriority % ICONS_LENGTH };
        });
    };

    useEffect(() => setLocalPriority(labelPriority[value]), [labelPriority, value]);
    useEffect(() => setDisabled(localPriority > 0), [localPriority]);

    const NumberIcon = useMemo(() => {
        const TmpIcon = ICONS[localPriority];
        return <TmpIcon />;
    }, [localPriority]);

    return (
        <Button
            leftIcon={NumberIcon}
            onClick={onBtnClick}
            variant="light"
            color={isDisabled ? 'teal' : 'blue'}
            size="sm"
            mr="sm"
            mb="sm"
            styles={(theme) =>
                localPriority === 0
                    ? {}
                    : {
                          root: {
                              '&:hover': {
                                  backgroundColor: theme.colors.teal[0],
                                  cursor: 'not-allowed',
                              },
                          },
                      }
            }>
            {value}
        </Button>
    );
}
