import React from "react"

const amsMessagesWrapper = Component => {
  return ({ messages, viewMessages, deleteMessages, getMessages, ...props }) => {
    React.useEffect(() => {
      getMessages();
    },[]);

    const [undeleted, deleted] = React.useMemo(() => {
      return messages.reduce((a, c) => {
        if (c.deleted) {
          a[1].push(c);
        }
        else {
          a[0].push(c);
        }
        return a;
      }, [[], []]);
    }, [messages]);

    const [selected, setSelected] = React.useState([]);

    const toggleSelected = React.useCallback(mId => {
      setSelected(prev => {
        if (prev.includes(mId)) {
          return prev.filter(id => id !== mId);
        }
        return [...prev, mId];
      });
    }, []);

    const toggleAll = React.useCallback(() => {
      setSelected(prev => {
        if (prev.length) {
          return [];
        }
        return messages.map(msg => msg.id);
      });
    }, [messages]);

    const viewSelected = React.useCallback(() => {
      viewMessages(selected);
    }, [viewMessages, selected]);

    const deleteSelected = React.useCallback(() => {
      setSelected([]);
      deleteMessages(selected);
    }, [deleteMessages, selected]);

    return (
      <Component { ...props }
        toggleSelected={ toggleSelected }
        viewMessages={ viewMessages }
        viewSelected={ viewSelected }
        deleteMessages={ deleteMessages }
        deleteSelected={ deleteSelected }
        toggleAll={ toggleAll }
        selected={ selected }
        messages={ undeleted }
        deleted={ deleted }/>
    )
  }
}
export default amsMessagesWrapper;
